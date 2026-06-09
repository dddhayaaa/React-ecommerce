import dayjs from "dayjs";

export function DeliveryDate({selectedDeliveryOption}) {
    return (
        <div className="delivery-date">
            Delivery date: {selectedDeliveryOption && dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
        </div>
    );
}