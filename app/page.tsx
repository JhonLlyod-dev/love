'use client';
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const correctPin = '1022';
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [input, setInput] = useState<string[]>([]);

  const handleNumberClick = (num: string) => {
    sound();
    if (input.length >= 4) return; // limit to 4 digits
    setInput([...input, num]);
  };

  const handleClear = () => {
    setInput([]);
    setIsUnlocked(false);
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
    setIsUnlocked(false);
  };

useEffect(() => {
  if (input.join("") === correctPin) {
    const timer = setTimeout(() => {
      beep();
      setIsUnlocked(true);

      setTimeout(() => {
        router.push("/home");
      }, 2300);
    }, 1000);

    return () => clearTimeout(timer); // cleanup
  }
}, [input, correctPin, router]);


  function sound () {
    const audio = new Audio('/m1.mp3');
    audio.play();
  }

  function beep () {
    const audio = new Audio('/m3.mp3');
    audio.play();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full max-w-4xl items-center flex-col p-3 px-6">
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          <img 
            src={isUnlocked ? "/good.gif" : "/cat_gun.gif"}
            alt="cat with gun"
            className="w-40 md:w-100 rounded-2xl  border-x-4 border-b-8 border-primary"
          />

          <div className="flex flex-col items-center justify-center ">
            <p className="text-3xl font-extrabold mb-4">
              Enter a 4 digit pin
            </p>

            {/* PIN DISPLAY */}
            <div className="flex items-center justify-between gap-3 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-12 w-12 text-white ${isUnlocked ? "bg-green-400 " : "bg-primary"} rounded-xl flex items-center justify-center text-2xl font-bold`}
                >
                  {input[i] ?? ""}
                </div>
              ))}
            </div>

            {/* KEYPAD */}
            <div className="grid grid-cols-3 gap-4 text-white">
              {["1","2","3","4","5","6","7","8","9"].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="h-16 w-16 rounded-full bg-primary font-bold text-xl btn"
                >
                  {num}
                </button>
              ))}

              <button
                onClick={handleClear}
                className="h-16 w-16 rounded-full bg-primary font-bold text-sm btn"
              >
                Clear
              </button>

              <button
                onClick={() => handleNumberClick("0")}
                className="h-16 w-16 rounded-full bg-primary font-bold text-xl btn"
              >
                0
              </button>

              <button
                onClick={handleDelete}
                className="h-16 w-16 rounded-full bg-primary font-bold text-sm btn"
              >
                Del
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
