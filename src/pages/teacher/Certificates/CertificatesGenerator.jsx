import React from 'react'
import { useParams } from 'react-router-dom';
import { QRCode } from '@liquid-js/qrcode-generator';
import { jsPDF } from "jspdf";
import JSZip from "jszip";

import './Amiri-Regular-normal';
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';

export default function CertificatesGenerator() {
  const [title, setTitle] = React.useState("Arduino pack: Design, Manage and Launch Arduino");
  const [date, setDate] = React.useState(null);
  const [csv, setCsv] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingDownloadAll, setLoadingDownloadAll] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const filesList = [];
  const { coursesId } = useParams();

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

    if (e.target.date.value == "" || e.target.csv.files.length == 0) {
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
      setLoading(false);
      setMsg(language['error_msg']);
    }
  }

  /**
   * handle downloading students certificates.
   * @param {string} student_name student name from CSV file
   */
  const handleDownloadCertificate = (student_name) => {
    setMsg(null);

    try {
      handleMakePdf(student_name, 'download');
    } catch (error) {
      setMsg(language['error_msg']);
    }
  }

  /**
   * function to compree all PDF files and download them as a zip file.
   * @param {number} current index number of current file in files array
   * @param {Array} array files array
  */
  const handleZipfile = (current, array, zip) => {
    let name = Date.now() * Math.random();
    zip.file(name + '.pdf', array[current]);

    if (current == (array.length - 1)) {
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          const zipFileName = title.replaceAll(' ', '-') + '.zip';
          const file_url = window.URL.createObjectURL(content);
          let a = document.createElement('a');
          a.href = file_url;
          a.download = zipFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setLoadingDownloadAll(false)
        })
        .catch(err => {
          setLoadingDownloadAll(false);
        });
    } else {
      handleZipfile(current + 1, array, zip);
    }
  }

  /**
   * function to to download all PDF files.
   */
  const downloadAll = () => {
    const zip = new JSZip();
    setLoadingDownloadAll(true);
    if (csv) {
      csv.map((item, index) => {
        if(item != ""){
          handleMakePdf(item, 'compress');
          if (index == (csv.length - 1)) {
  
            handleZipfile(0, filesList, zip);
          }
        }
      });
    }
  }


  /**
   * Function to generate PDF files for each student
   * @param {string} student_name name of the current student
   * @param {string} output output type: download | compress
  */
  const handleMakePdf = (student_name, output) => {
    if(student_name == ""){
      return false;
    }
    const cr_ref = String(Date.now());
    // Replace file name spaces with dash
    const file_name = title.replaceAll(' ', '-') + '-certificate.pdf';

    // add certificate URL as QR Code.
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
            <input type="date" id="date" name="date" className="py-2 px-4 rounded-xl shodow-sm bg-color w-full placeholder-gray-400" placeholder={language && language["write_here"]} />
          </label>

          <p className="my-3 font-bold">{language && language["upload"]}</p>
          <label htmlFor="csv" className="block my-3 rounded-xl bg-color py-7 p-5">
            <input type="file" name="csv" id="csv" accept=".csv" />
          </label>

          {msg && <div className="py-4 my-2 text-color">{msg}</div>}

          <div className="flex flex-row justify-between mt-2">
            <button type="submit" className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400">
              {loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["generate"]}</span>
            </button>
          </div>
        </form>

        <div className="p-4">
          <div className="flex justify-between border-b border-b-gray-200">
            {csv && <p className="text-l text-color py-4">{language && language['result']}: {language && language['found']} {csv.length} {language && language['names']}.</p>}
            {csv && <button type="button" onClick={downloadAll} className="flex rounded pointer m-2 py-2 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 cursor-pointer">{loadingDownloadAll && <img className="animate-spin w-4 m-1" src="/loading_white.png" />} <span className="mx-1">{language && language['download_all']}</span></button>}
          </div>
          <div className="max-h-[520px] overflow-x-auto">
            {csv && csv.map((item, index) => <div className="p-2 my-2 bg-white rounded flex justify-between hover:bg-gray-50" key={item + "-" + index}>
              <p>{(index + 1)} - {item}</p>
              <button className="rounded cursor-pointer py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-xs hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 " onClick={() => handleDownloadCertificate(item)}>{language && language['download']}</button>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </ThemeContainer>);
}