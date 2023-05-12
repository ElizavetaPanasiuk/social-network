import { useState } from 'react';
import { Textarea, Button } from '@/ui-kit';
import { useTranslation } from 'react-i18next';

type PostEditProps = {
  postContent: string;
  onSave: (value: string) => void;
};

const PostEdit = ({ postContent, onSave }: PostEditProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState(postContent);

  return (
    <>
      <Textarea
        value={text}
        onChange={setText}
      />
      <Button
        title={t('Save')}
        onClick={() => onSave(text)}
      />
    </>
  );
};

export default PostEdit;
