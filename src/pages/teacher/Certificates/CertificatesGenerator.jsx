import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { jsPDF } from "jspdf";
import { useParams } from 'react-router-dom';
import { QRCode } from '@liquid-js/qrcode-generator';
//import JSZip from "jszip";
import './Amiri-Regular-normal';

export default function CertificatesGenerator() {
  const [title, setTitle] = React.useState("Arduino pack: Design, Manage and Launch Arduino");
  const [date, setDate] = React.useState(null);
  const [csv, setCsv] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const filesList = [];
  const { coursesId } = useParams();
  //const zip = new JSZip();

  // handle loading language strings..
  React.useEffect(() => {
    const lang = window.localStorage.getItem("language");

    if (lang && lang != '' && lang != null) {
      if (lang == 'english') {
        setLanguage(translation[0]);
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      } else {
        setLanguage(translation[1]);
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      }
    } else {
      setLanguage(translation[0]);
      window.localStorage.setItem("language", 'english');
      window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    }
  }, []);

  /*
    React.useEffect(() => {
      loadData()
    }, []);
  */
  /**
   * @async
   * load all courses categories data
   */
  const loadData = async () => {
    const response = await api.get('/courses/' + coursesId);
    if (response.status == 200) {
      setTitle(response.data.title);
    }
  }

  /**
   * 
   * @param {Event} e get event from generate form
   */
  const handleGenerate = (e) => {
    e.preventDefault();
    setMsg(null);
    setCsv(null);

    if (e.target.title.value == "") {
      setMsg(language['error_validation_msg']);

      return false;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      let cvArr = [];

      reader.onload = function () {
        cvArr = reader.result.replaceAll(",", "").split('\n');

        setCsv(cvArr);
        setDate(e.target.date.value);
        setLoading(false);
      };

      reader.readAsText(e.target.csv.files[0]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMsg(language['error_validation_msg']);
    }
  }

  /**
   * handle downloading students certificates.
   * @param {string} student_name student name from CSV file
   */
  const handleDownloadCertificate = async (student_name) => {
    setMsg(null);

    try {
      await handleMakePdf(student_name, 'download');
    } catch (error) {
      console.log(error);
      setMsg(language['error_msg']);
    }
  }


  /**
   * 
   * @param {number} current index number of current file in files array
   * @param {Array} array files array
   */
  /*
  const handleZipfile = (current, array) => {
    setTimeout(() => {
      zip.file(array[current]);

      if (current == array.length) {
        console.log(current);

        zip.generateAsync({ type: "blob" })
          .then(function (content) {
            console.log(content);

            const zipFileName = title.replaceAll(' ', '-') + '.zip';
            const file_url = window.URL.createObjectURL(content);
            let a = document.createElement('a');
            a.href = file_url;
            a.download = zipFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
      } else {
        handleNext(current + 1, array);
      }
    }, 2000);
  }

  const downloadAll = async () => {
    if (csv) {
      csv.map(async (item, index) => {
        await handleMakePdf(item, 'compress');
        if (index == csv.length) {
          handleZipfile(0, filesList);
        }
      });
    }
  }
  */

  /**
   * function to generate PDF files for each student
   * @param {string} student_name name of the current student
   * @param {string} output output type: download | compress
   */
  const handleMakePdf = async (student_name, output) => {
    const cr_ref = String(Date.now());
    // replace file name spaces with dash
    const file_name = title.replaceAll(' ', '-') + '-certificate.pdf'
    const qr = new QRCode(4, 'L');
    qr.addData('https://fep.misk-donate.com/?c=' + cr_ref);
    qr.make();
    const qr_image = qr.toDataURL();

    let logo = "/logo/Logo.png";
    let bgcer = "/cerbg.png";

    // creating certificate PDF
    const doc = new jsPDF('landscape', 'pt', 'a4');
    const centerX = doc.internal.pageSize.getWidth() / 2;
    // get font name from 'Amiri-Regular-normal.js'
    doc.setFont('Amiri-Regular');
    doc.setTextColor('#212121');
    doc.setFontSize(26);
    doc.addImage(bgcer, 'png', 0, 0, 850, 600);
    doc.addImage(logo, 'png', centerX - 70, 180, 142, 54);
    doc.addImage(qr_image, 'png', centerX + 200, 450, 100, 100);
    doc.setFontSize(32);
    doc.text(student_name, centerX, 310, { align: 'center', dir: language['dir'] });
    doc.setFontSize(18);

    // if user UI language is arabic or english this will effect the certificate language.
    if (language['dir'] == 'ltr') {
      doc.text("In " + title + " on " + date, centerX, 350, { align: 'center', dir: 'ltr' });
    } else {
      doc.text("في برنامج " + title + " بتاريخ " + date, centerX, 350, { align: 'center', dir: 'rtl' });
    }

    // Save certificate file as PDF and download it.
    if (output == 'download') {
      doc.save(file_name);
    } else {
      const file_name = title.replaceAll(' ', '-') + '-certificate.pdf';
      filesList.push(doc.output('blob', file_name));
    }
  }

  return (<ThemeContainer role="teachers">
    <div className="block w-[75%] mx-auto my-5">
      <div className="p-3">
        <h2 className="text-2xl font-bold border-b border-b-gray-200">{language && language['certificates_generator']}</h2>
        <p className="text-l text-color my-7">
          {language && language['certificates_generator_note']} <a className="mx-2 underline text-[#fa9600] hover:text-amber-700" href="/students-names-template.csv" download>{language && language['download_template']}</a>
        </p>

        <form onSubmit={handleGenerate} method="post">
          <h3 className="py-4 my-3 text-2xl font-bold">{title}</h3>

          <label htmlFor="date">
            <p className="my-3 font-bold">{language && language["date"]}</p>
            <input id="date" name="date" className="py-2 px-4 rounded shodow-sm bg-color w-full placeholder-gray-400" placeholder={language && language["write_here"]} />
          </label>

          <p className="my-3 font-bold">{language && language["upload"]}</p>
          <label htmlFor="date" className="block my-3 rounded-2xl bg-color py-7 p-5">
            <input type="file" name="csv" id="csv" accept=".csv" />
          </label>

          {msg && <div className="p-4 m-2 text-color">{msg}</div>}

          <div className="flex flex-row justify-between mt-2">
            <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">
              {loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["generate"]}</span>
            </button>
            {/* {csv && <button type="button" onClick={downloadAll} className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">{language && language['download_all']}</button>} */}
          </div>
        </form>

        <div className="p-4">
          {csv && <p className="text-sm my-7 text-color border-b border-b-gray-200 py-4">{language && language['found']} {csv.length} {language && language['names']}.</p>}

          {csv && csv.map((item, index) => <div className="p-3 my-3 bg-white rounded-2xl flex justify-between hover:bg-gray-50" key={item + "-" + index}>
            <p>{(index + 1)} - {item}</p>
            <button className="rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-xs hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 " onClick={() => handleDownloadCertificate(item)}>{language && language['download']}</button>
          </div>)}
        </div>
      </div>
    </div>
  </ThemeContainer>);
}