import React, { useEffect, useState } from 'react';
import details from '../Assets/punt-frontend-assignment (1).json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Home.css';

interface FontVariants {
  [weight: string]: string;
}

interface FontDetails {
  [fontName: string]: FontVariants;
}

interface FontVariant {
  weight: number;
  italic: boolean;
}

const findClosestVariant = (
  desiredWeight: number,
  desiredItalic: boolean,
  availableVariants: FontVariant[]
): FontVariant => {
  const italicVariants = availableVariants.filter(variant => variant.italic);
  const nonItalicVariants = availableVariants.filter(variant => !variant.italic);

  const getClosestWeight = (weight: number, variants: FontVariant[]): FontVariant => {
    return variants.reduce((prev, curr) => 
      Math.abs(curr.weight - weight) < Math.abs(prev.weight - weight) ? curr : prev
    );
  };

  if (desiredItalic) {
    if (italicVariants.length > 0) {
      return getClosestWeight(desiredWeight, italicVariants);
    }
    return getClosestWeight(desiredWeight, nonItalicVariants);
  } else {
    if (nonItalicVariants.length > 0) {
      return getClosestWeight(desiredWeight, nonItalicVariants);
    }
    return getClosestWeight(desiredWeight, italicVariants);
  }
};

export const Home = () => {
  const fontDetails: FontDetails = details;
  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(false);
  const [font, setFont] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [fontWeights, setFontWeights] = useState<FontVariants>({});

  useEffect(() => {
    const head = document.head;
    if (weight && font) {
      let url = fontDetails[font][weight];
      if (!url) {
        const availableVariants = Object.entries(fontDetails[font]).map(([variant]) => {
          const weight = parseInt(variant, 10);
          const italic = variant.includes('italic');
          return { weight, italic };
        });

        const closestVariant = findClosestVariant(parseInt(weight), toggle, availableVariants);
        setWeight(closestVariant.weight.toString());
        setToggle(closestVariant.italic);
        url = fontDetails[font][closestVariant.weight + (closestVariant.italic ? 'italic' : '')];
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.setAttribute('data-font', font);
      head.appendChild(link);

      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: '${font}';
          font-weight: ${weight};
          src: url(${url}) format('woff2');
        }
      `;
      head.appendChild(style);
    }
  }, [font, weight, toggle]);

  useEffect(() => {
    if (font) {
      const newFontWeights: FontVariants = {};
      Object.entries(fontDetails[font]).forEach(([weight, url]) => {
        if (weight.length === 3) {
          newFontWeights[weight] = url;
        }
      });
      setFontWeights(newFontWeights);
    } else {
      setFontWeights({});
    }
  }, [font]);

  useEffect(() => {
    const savedText = localStorage.getItem('text');
    const savedFont = localStorage.getItem('font');
    const savedWeight = localStorage.getItem('weight');
    const savedItalic = localStorage.getItem('toggle');
    if (savedText) setText(savedText);
    if (savedFont) setFont(savedFont);
    if (savedWeight) setWeight(savedWeight);
    if (savedItalic) setToggle(JSON.parse(savedItalic));
  }, []);

  const handlesave = () => {
    localStorage.setItem('text', text);
    localStorage.setItem('font', font);
    localStorage.setItem('weight', weight);
    localStorage.setItem('toggle', JSON.stringify(toggle));
    toast.success('Data saved!');
  };

  const handlereset = () => {
    setText('');
    setFont('');
    setWeight('');
    setToggle(false);
    localStorage.removeItem('text');
    localStorage.removeItem('font');
    localStorage.removeItem('weight');
    localStorage.removeItem('toggle');
    toast.success('Data Reset!');
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);

    const availableVariants = Object.entries(fontDetails[selectedFont]).map(([variant]) => {
      const weight = parseInt(variant, 10);
      const italic = variant.includes('italic');
      return { weight, italic };
    });

    const closestVariant = findClosestVariant(parseInt(weight) || 400, toggle, availableVariants);
    setWeight(closestVariant.weight.toString());
    setToggle(closestVariant.italic);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeight = e.target.value;
    setWeight(selectedWeight);
  };

  return (
    <>
      <ToastContainer />
      <div className="home-box">
        <div className="container">
          <div className="desc-sec" style={{display:'flex',alignItems:'center'}}>
            <div className="font-family-sec">
              <select value={font} onChange={handleFontChange} className="select">
                <option value="">Select Font</option>
                {Object.keys(details).map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div className="variant-sec">
              <select value={weight} onChange={handleWeightChange} className="select">
                <option value="">Select Weight</option>
                {!font ? '' : Object.keys(fontWeights).map((weight) => (
                  <option key={weight} value={weight}>{weight}</option>
                ))}
              </select>
            </div>
            <div className="toggle-sec" style={{display:'flex',flexDirection:'row',gap:'20px',alignItems:'center'}}>
             <p>Italic</p>
              <button 
                className={`toggle-btn ${toggle ? 'active' : ''}`} 
                onClick={() => setToggle(!toggle)} 
                disabled={fontDetails[font] === undefined || fontDetails[font][weight + 'italic'] === undefined}
              >
                {toggle ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
          <div className="text-sec">
            <textarea 
              style={{ fontFamily: font, fontWeight: weight, fontStyle: toggle ? 'italic' : 'normal' }} 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="text-area"
            />
          </div>
          <div className="reset-save">
            <button className="btn reset" onClick={handlereset}>Reset</button>
            <button className="btn save" onClick={handlesave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};
