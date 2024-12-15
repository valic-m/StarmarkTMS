import React from 'react';
import logo from 'assets/img/icons/logo.png';
import classNames from 'classnames';

interface LogoProps {
  width?: number;
  text?: boolean;
  textClass?: string;
  className?: string;
}

const Logo = ({ width = 60, text = true, textClass, className }: LogoProps) => {
  return (
    <div className={classNames(className, 'd-flex align-items-center')}>
      <img
        src={logo}
        alt="STARMARK"
        style={{ width: `${width}px`, height: 'auto' }} // Dynamically set the width
      />
      {text && (
        <p className={classNames(textClass, 'logo-text ms-2')}>
          S T A R M A R K
        </p>
      )}
    </div>
  );
};

export default Logo;
