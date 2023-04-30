import styles from "./styles.module.scss";

type AvatarProps = {
  alt: string;
  src: string;
  size?: "small" | "medium" | "large";
  border?: boolean;
};

const Avatar = ({ alt, src, size = "small", border = false }: AvatarProps) => {
  return (
    <img
      className={`${styles.avatar} ${styles[size]} ${
        border ? styles.border : ""
      }`}
      alt={alt}
      src={`http://localhost:5000/${src}`}
    />
  );
};

export default Avatar;
