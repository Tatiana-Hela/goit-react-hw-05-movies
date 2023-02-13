import { NavLink } from 'react-router-dom';

import css from '../Menu/Menu.module.css';

import items from './items';

const getClassName = ({ isActive }) => {
  const className = isActive ? `${css.link} ${css.active}` : css.link;
  return className;
};

const Menu = () => {
  const elements = items.map(({ id, to, text }) => {
    return (
      <li key={id}>
        <NavLink className={getClassName} to={to}>
          {text}
        </NavLink>
      </li>
    );
  });

  return (
    <header>
      <div className={css.wrapper}>
        <ul className={css.menu}>{elements}</ul>
      </div>
    </header>
  );
};
export default Menu;
