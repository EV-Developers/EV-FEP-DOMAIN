import React from 'react'
import ThemeContainer from '../../../compenents/parts/ThemeContainer'
import { translation } from '../../../config/translations';
import { jsPDF } from "jspdf";
import './Amiri-Regular-normal';
import { useParams } from 'react-router-dom';

export default function CertificatesGenerator() {
  const [title, setTitle] = React.useState("Arduino pack: Design, Manage and Launch Arduino");
  const [date, setDate] = React.useState(null);
  const [csv, setCsv] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const { coursesId } = useParams();


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

  const handleGenerate = (e) => {
    e.preventDefault();
    setMsg(null);
    setCsv(null);

    if (e.target.title.value == "") {
      setMsg(language['error_validation_msg']);

      return false;
    }

    setLoading(true);

    const reader = new FileReader();
    let cvArr = [];

    reader.onload = function () {
      cvArr = reader.result.replaceAll(",", "").split('\n');
      setCsv(cvArr);
      setDate(e.target.date.value);
      setLoading(false);
    };

    reader.readAsText(e.target.csv.files[0]);
  }

  const handleDownloadCertificate = (student_name) => {
    setMsg(null);

    try {
      const file_name = title.replaceAll(' ', '-') + '-certificate.pdf'

      let logo = "/logo/Logo.png";
      let bgcer = "/cerbg.png";

      const doc = new jsPDF('landscape', 'pt', 'a4');
      const centerX = doc.internal.pageSize.getWidth() / 2;
      doc.setFont('Amiri-Regular');
      doc.setTextColor('#212121');
      doc.setFontSize(26);
      doc.addImage(bgcer, 'png', 0, 0, 850, 600);
      doc.addImage(logo, 'png', centerX - 70, 180, 142, 54);
      doc.setFontSize(32);
      doc.text(student_name, centerX, 310, { align: 'center', dir: language['dir'] });
      doc.setFontSize(18);

      if(language['dir'] == 'ltr'){
        doc.text("In " + title + " on " + date, centerX, 350, { align: 'center', dir: language['dir'] });
      } else {
        doc.text("في برنامج " + title + " بتاريخ " + date, centerX, 350, { align: 'center', dir: language['dir'] });
      }

      doc.save(file_name);
    } catch (error) {
      console.log(error);

      setMsg(language['error_msg']);
    }
  }
  return (<ThemeContainer role="teachers">
    <div className="block w-[75%] mx-auto my-5">
      <div className="p-3">
        <h2 className="text-2xl font-bold border-b border-b-gray-200">{language && language['certificates_generator']}</h2>
        <p className="text-l text-color my-7">{language && language['certificates_generator_note']} (<a className="mx-2 underline" href="/students-names-template.csv" download>{language && language['download_template']}</a>)</p>
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
            <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400" type="submit">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["generate"]}</span></button>
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