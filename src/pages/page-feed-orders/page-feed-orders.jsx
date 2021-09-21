// eslint-disable-next-line import/no-cycle
import OrdersFeed from "../../components/orders-feed/orders-feed";
import styles from "./page-feed-orders.module.css"

const PageFeedOrders = () => (
  <div className={styles.wrapper}>
    <OrdersFeed />
  </div>
);

export default PageFeedOrders;
