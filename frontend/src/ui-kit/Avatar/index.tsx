import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { useState } from 'react';

type AvatarProps = {
  alt: string;
  src: string;
  size?: 'small' | 'medium' | 'large';
  border?: boolean;
  edit?: boolean;
  onChange?: (key: 'avatar', value: string | File) => void;
};

const Avatar = ({ alt, src, size = 'small', border = false, edit = false, onChange }: AvatarProps) => {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState();

  return !edit ? (
    <img
      className={`${styles.avatar} ${styles[size]} ${border ? styles.border : ''}`}
      alt={alt}
      src={`http://localhost:5000/${src}`}
    />
  ) : (
    <div className={styles.editableContainer}>
      <img
        className={`${styles.avatar} ${styles[size]} ${border ? styles.border : ''}`}
        alt={alt}
        src={uploadedFile ? uploadedFile : src}
      />
      <label
        htmlFor="avatar"
        className={styles.editButton}
      >
        {t('Upload')}
      </label>
      <input
        name="avatar"
        type="file"
        id="avatar"
        className={styles.fileUploaderButton}
        onChange={(e) => {
          if (e.target.files) {
            onChange('avatar', e.target.files[0]);
            setUploadedFile(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
    </div>
  );
};

export default Avatar;
