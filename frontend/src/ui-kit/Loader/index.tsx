import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

const Loader = () => (
  <div className={styles.loaderContainer}>
    <FontAwesomeIcon
      icon={faSpinner}
      className={styles.loader}
      size="2x"
      spin
    />
  </div>
);

export default Loader;
