import React from 'react';

interface Props {
  width: string
}

const Footer = ({width}: Props) => {
  return (
    <div
      className={`bg-[--main-yellow] text-center fixed bottom-0 text-black py-1 ${width}`}>
      <p className="text-xs">2023 TODOS LOS DERECHOS RESERVADOS</p>
    </div>
  );
};

export default Footer;
