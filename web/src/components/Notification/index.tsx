import React from "react";

type Props = {
  className?: string;
};

export default function Notification({ className }: Props) {
  return <div className={className}></div>;
}
