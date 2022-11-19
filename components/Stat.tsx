
import sty from '../styles/Stat.module.scss';

/**
 * Constains a name and value for a
 * statistic about the address queried
 */
export default function Stat({name, value}: {name: string, value: string}) {
  return (
    <article className={sty.stat}>
      <h2 className={sty.h2}>{name}</h2>
      <div className={sty.value}>{value}</div>
    </article>
  );
}