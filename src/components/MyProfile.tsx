import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import defaultIcon from "../images/user.svg";
import { doc, setDoc } from "firebase/firestore";

export default function MyProfile() {
  const [myName, setMyName] = useState("");
  const [myImage, setMyImage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setMyName(user.displayName || "");
        setMyImage(user.photoURL || "");
      } else {
        setMyName("");
        setMyImage("");
      }
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const onMyImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const user = auth.currentUser;
    if (!user || !files || files.length === 0) return;
    const file = files[0];
    const locationRef = ref(storage, `profileImages/${user?.uid}`);
    const result = await uploadBytes(locationRef, file);
    const profileUrl = await getDownloadURL(result.ref);
    setMyImage(profileUrl);
    await updateProfile(user, { photoURL: profileUrl });

    const userProfileRef = doc(db, "userProfiles", user.uid);
    await setDoc(userProfileRef, { photoURL: profileUrl }, { merge: true });
    window.location.reload();
  };

  return (
    <div className="flex-2 flex items-center gap-3">
      <label
        htmlFor="myImage"
        className="h-12 w-12 cursor-pointer overflow-hidden rounded-full"
      >
        {myImage ? (
          <img alt="User Profile" src={myImage} />
        ) : (
          <img alt="User Profile" src={defaultIcon} />
        )}
      </label>
      <input
        onChange={onMyImageChange}
        id="myImage"
        type="file"
        accept="image/*"
        className="hidden"
      />
      <h1>{myName}</h1>
    </div>
  );
}
