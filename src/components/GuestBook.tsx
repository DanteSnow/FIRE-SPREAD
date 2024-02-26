import { IGuestBook } from "./GuestBookList";

export default function GuestBook({ guestBook, username }: IGuestBook) {
  return (
    <>
      <div>{username}</div>
      <div>{guestBook}</div>
    </>
  );
}
