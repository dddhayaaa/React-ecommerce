import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";


export function OrdersHeader({orders}) {
    return (
        <div className="order-header">
            <div className="order-header-left-section">
                <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(orders.orderTimeMs).format('MMMM,D')}</div>
                </div>
                <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(orders.totalCostCents)}</div>
                </div>
            </div>

            <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{orders.id}</div>
            </div>
        </div>
    );
}