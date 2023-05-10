import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styles from "@/styles/CourseDetail.module.css";
import Rating from "react-rating";

export default function Stars({ value = 0 }) {
  return (
    <span className={styles.stars}>
      {/* <BsStarFill />
      <BsStarFill />
      <BsStarFill />
      <BsStarFill /> */}
      {/* <BsStarHalf /> */}
      {/* <BsStar /> */}
      <Rating
        initialRating={value}
        readonly={true}
        emptySymbol={<BsStar />}
        fullSymbol={<BsStarFill />}
        />
    </span>
  );
}
