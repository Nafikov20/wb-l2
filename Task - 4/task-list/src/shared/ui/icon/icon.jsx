
import cc from 'classcat';



// eslint-disable-next-line react/prop-types
export const Icon = ({ name, className, ...props }) => {
  // eslint-disable-next-line react/prop-types
  const [spriteName, iconName] = name.split('/');

  return (
    <svg
      className={cc(['select-none fill-current text-inherit', className])}
      {...props}
    >
      <use xlinkHref={`/imgs/svg-sprites/${spriteName}.svg#${iconName}`} />
    </svg>
  );
};
