import { useState } from "react";
import { Avatar, Box, Button, IconButton, Textarea } from "@/ui-kit";
import { Post as PostType } from "../types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

type PostProps = PostType & {
  updatePost: (id: number, text: string) => void;
  removePost: (id: number) => void;
};

const Post = ({
  id,
  avatar,
  text,
  createdAt,
  author: { firstName, lastName },
  updatePost,
  removePost,
}: PostProps) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  const onSave = async () => {
    await updatePost(id, editText);
    setEditMode(false);
  };

  return (
    <Box className={styles.post}>
      <div className={styles.header}>
        <Avatar src={avatar} alt={`${firstName} ${lastName}`} />
        <div>
          <h4>
            {firstName} {lastName}
          </h4>
          <p>{createdAt}</p>
        </div>
      </div>
      {editMode ? (
        <>
          <Textarea
            value={editText}
            onChange={setEditText}
            placeholder={t("Enter post text") as string}
          />
          <Button title={t("Save")} onClick={onSave} size="small" />
        </>
      ) : (
        <p>{text}</p>
      )}
      {!editMode && (
        <div>
          <IconButton icon="edit" onClick={() => setEditMode(!editMode)} />
          <IconButton icon="remove" onClick={() => removePost(id)} />
        </div>
      )}
    </Box>
  );
};

export default Post;
