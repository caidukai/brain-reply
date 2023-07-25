/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import styles from "../styles/loading-dots.module.css";

const LoadingDots = ({
  color = "#000",
  style = "small",
}: {
  color: string;
  style: string;
}) => {
  return (
    <span className={style == "small" ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: "small",
};