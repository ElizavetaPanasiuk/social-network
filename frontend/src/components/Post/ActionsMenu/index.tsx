import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type ActionsMenuProps = {
  onDelete: () => void;
  setActionsMenuVisible: (value: boolean) => void;
};

const ActionsMenu = ({ onDelete, setActionsMenuVisible }: ActionsMenuProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.actionsMenu}>
      <button
        className={styles.actionButton}
        type="button"
      >
        {t('Edit')}
      </button>
      <button
        className={styles.actionButton}
        type="button"
        onClick={() => {
          onDelete();
          setActionsMenuVisible(false);
        }}
      >
        {t('Remove')}
      </button>
    </div>
  );
};

export default ActionsMenu;
