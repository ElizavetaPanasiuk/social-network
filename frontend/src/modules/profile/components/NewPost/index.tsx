import { useState } from 'react';
import { Button, Textarea } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type NewPostProps = {
  publish: (text: string) => void;
};

const NewPost = ({ publish }: NewPostProps) => {
  const { t } = useTranslation();
  const [postText, setPostText] = useState('');

  const onPublish = async () => {
    await publish(postText);
    setPostText('');
  };

  return (
    <div className={styles.newPost}>
      <Textarea
        value={postText}
        onChange={setPostText}
        placeholder={t("What's new?") as string}
      />
      <Button
        title={t('Publish')}
        onClick={onPublish}
      />
    </div>
  );
};

export default NewPost;
