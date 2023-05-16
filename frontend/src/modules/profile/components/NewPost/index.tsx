import { useState } from 'react';
import { SubmitButton, Textarea } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Form } from '@/components';

type NewPostProps = {
  publish: (text: string) => void;
};

const NewPost = ({ publish }: NewPostProps) => {
  const { t } = useTranslation();
  const [postText, setPostText] = useState('');

  const onSubmit = async () => {
    await publish(postText);
    setPostText('');
  };

  return (
    <Form
      className={styles.newPost}
      onSubmit={onSubmit}
    >
      <Textarea
        value={postText}
        onChange={setPostText}
        placeholder={t("What's new?") as string}
      />
      <SubmitButton
        title={t('Publish')}
        disabled={!postText.trim()}
      />
    </Form>
  );
};

export default NewPost;
