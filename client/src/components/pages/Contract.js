import React from 'react';
import './Contract.css';

const Contract = () => {
  return (
    <div className="contract-page">
      
      <div className="header-section">
        <img src="/assets/logoChlin.png" alt="logo" className="logo" />
        <div className="text-section">
        <br/><br/>
          <h1><strong>ฌลิล.</strong></h1>
          <p>
            ยินดีต้อนรับสู่ร้าน "ฌลิล" ร้านขายน้ำที่นำเสนอเครื่องดื่มสุดพิเศษที่รังสรรค์ขึ้นด้วยใจรักและความใส่ใจในทุกขั้นตอน 
            เราไม่เพียงแค่ขายเครื่องดื่มทั่วไป 
            แต่ยังมุ่งมั่นที่จะสร้างประสบการณ์การดื่มน้ำที่สดชื่นและ
            หลากหลาย เพื่อให้ลูกค้าของเราได้รับความพึงพอใจสูงสุด
          </p>
          <br/>
          <p>
            ฌลิล มุ่งมั่นที่จะเป็นผู้นำในการสร้างสรรค์เครื่องดื่มที่มีคุณภาพสูง 
            เราเชื่อว่าการดื่มน้ำที่ดีนั้นมีผลต่อสุขภาพและชีวิตประจำวัน 
            เราจึงคัดสรรวัตถุดิบจากธรรมชาติ ไม่ว่าจะเป็นผลไม้สด น้ำผึ้งธรรมชาติ หรือวัตถุดิบเพื่อสุขภาพอื่น ๆ 
            ที่คัดเลือกมาอย่างดีเพื่อให้แน่ใจว่าทุกแก้วที่ลูกค้าดื่มจะเป็นเครื่องดื่มที่ดีต่อร่างกาย
          </p>
        </div>
      </div>

      <div className="image-section">
        <img src="/assets/con2.jpg" alt="kitchen" className="image" />
      </div>

      <div className="quote-section">
        <blockquote><strong>
        "<br />
        ฌลิล สัญญาว่าจะมอบสิ่งที่ดีที่สุดให้กับคุณ<br />
        ไม่ว่าจะเป็นรสชาติ บรรยากาศ <br />
        หรือการบริการ<br />
        <span className="quote-end">"</span>
        </strong>
        </blockquote>
        <img src="/assets/con1.jpg" alt="drinks" className="image small" />
      </div>
      <br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Contract;
