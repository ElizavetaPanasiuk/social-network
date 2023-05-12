import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type ActionsMenuProps = {
  onDelete: () => void;
  onEdit: () => void;
  setActionsMenuVisible: (value: boolean) => void;
};

const ActionsMenu = ({ onDelete, onEdit, setActionsMenuVisible }: ActionsMenuProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.actionsMenu}>
      <button
        className={styles.actionButton}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onEdit();
          setActionsMenuVisible(false);
        }}
      >
        {t('Edit')}
      </button>
      <button
        className={styles.actionButton}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
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
