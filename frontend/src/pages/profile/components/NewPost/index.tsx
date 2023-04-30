import { useState } from "react";
import { Button, Textarea } from "@/ui-kit";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const NewPost = () => {
  const { t } = useTranslation();
  const [postText, setPostText] = useState("");

  return (
    <div className={styles.newPost}>
      <Textarea
        value={postText}
        onChange={setPostText}
        placeholder={t("What's new?") as string}
      />
      <Button title={t("Publish")} onClick={() => console.log("create")} />
    </div>
  );
};

export default NewPost;
