import { IGuestBook } from "./GuestBookList";

export default function GuestBook({ guestBook, username }: IGuestBook) {
  return (
    <>
      <span className="mt-5 pb-2 pl-5 text-lg font-bold">{username}</span>
      <span className="mb-5 h-40 rounded-xl border-2 border-black p-5">
        {guestBook}
      </span>
    </>
  );
}
