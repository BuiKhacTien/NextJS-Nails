//import moment from "moment";
import moment from "moment-timezone"
import React from "react";

const NumberBlock = ({ name, num = 0 }) => {
  return (
    <div className="number-block">
      <div className="date">{num}</div>
      <div className="name">{name}</div>
    </div>
  );
};
const Discount = ({ endPromotion, price, priceDiscount }) => {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const time = moment.tz(`${endPromotion} 24:00:00`, "YYYY-MM-DD hh:mm:ss",'America/Toronto');
    var x = setInterval(() => { 
			const now = moment()
      const diff = time.diff(now);
			const diffDuration = moment.duration(diff)
			const days = diffDuration.days()
			const hours = diffDuration.hours()
			const minutes = diffDuration.minutes()
			const seconds = diffDuration.seconds()
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => {
        clearInterval(x);
    }
  }, []);
  const onCountdown = (expiration) => {
    
  };
  return (
    <div className="discount-block">
      <div className="row g-0">
        <div className="col-4">
          <div className="deal-end">DEAL ENDS IN</div>
        </div>
        <div className="col-2">
          <NumberBlock name="Days" num={days} />
        </div>
        <div className="col-2">
          <NumberBlock name="Hours" num={hours} />
        </div>
        <div className="col-2">
          <NumberBlock name="Minutes" num={minutes} />
        </div>
        <div className="col-2">
          <NumberBlock name="Seconds" num={seconds} />
        </div>
      </div>
    </div>
  );
};

export default Discount;
