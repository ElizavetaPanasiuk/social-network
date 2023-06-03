import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

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
  const [uploadedFile, setUploadedFile] = useState<string | null>();

  return edit && onChange ? (
    <div className={styles.editButtonContainer}>
      <img
        className={styles.avatar}
        alt={alt}
        src={uploadedFile ? uploadedFile : src}
        data-border={border}
        data-size={size}
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
        className={styles.fileInput}
        onChange={(e) => {
          if (e.target.files) {
            onChange('avatar', e.target.files[0]);
            setUploadedFile(URL.createObjectURL(e.target.files[0]) as string);
          }
        }}
      />
    </div>
  ) : (
    <img
      className={styles.avatar}
      alt={alt}
      src={`${import.meta.env.VITE_API_URL}/${src}`}
      data-border={border}
      data-size={size}
    />
  );
};

export default Avatar;
