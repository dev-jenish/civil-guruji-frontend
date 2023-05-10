/* eslint-disable @next/next/no-img-element */
import React from "react";
import Stars from "../Stars";
import styles from "@/styles/CourseInfo.module.css";

export default function FeedbackCard() {
  return (
    <div className={styles.feedbackCard}>
      <div className={styles.reviewer}>
        <img
          src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=JackFrost"
          alt="Jack Frost"
        />
        <p>Harsh Pandey</p>
      </div>
      <div className={styles.review}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi impedit
          blanditiis unde repellendus voluptatum hic adipisci sapiente
          recusandae aliquid enim, consequuntur.
        </p>
        <p>
          3.5 <Stars />
        </p>
      </div>
    </div>
  );
}
