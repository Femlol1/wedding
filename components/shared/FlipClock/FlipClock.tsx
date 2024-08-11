"use client";
import { useEffect, useState } from "react";
import styles from "./FlipClock.module.css";

const FlipClock = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);
  const [flippingUnits, setFlippingUnits] = useState({});

  function calculateTimeLeft() {
    const now = new Date();
    const event = new Date(eventDate);
    const difference = event.getTime() - now.getTime();

    return {
      months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      setFlippingUnits({
        months: newTimeLeft.months !== timeLeft.months,
        days: newTimeLeft.days !== timeLeft.days,
        hours: newTimeLeft.hours !== timeLeft.hours,
        minutes: newTimeLeft.minutes !== timeLeft.minutes,
      });

      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className={styles.flipClock}>
      {Object.keys(timeLeft).map((unit, index) => (
        <div key={index} className={styles.flipUnitContainer}>
          <div className={`${styles.flipCard} ${flippingUnits[unit] ? styles.flipping : ""}`}>
            <div className={styles.upperCard}>{timeLeft[unit]}</div>
            <div className={styles.lowerCard}>{prevTimeLeft[unit]}</div>
          </div>
          <div className={styles.flipLabel}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
        </div>
      ))}
    </div>
  );
};

export default FlipClock;
