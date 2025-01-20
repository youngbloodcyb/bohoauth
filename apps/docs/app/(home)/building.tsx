import Link from "next/link";

export function Building() {
  return (
    <div
      id="box"
      className="relative w-[500px] h-[800px] transform-style-3d hidden lg:block"
      style={{
        transform: "rotateX(-15deg) rotateY(-30deg)",
      }}
    >
      {/* Front Face */}
      <div
        className="absolute flex items-center justify-center w-[500px] h-[800px]"
        style={{
          transform: "translateZ(250px)",
          backgroundColor: "#f2ecdc",
          border: "1px solid black",
          borderRight: "none",
          borderTop: "none",
        }}
      >
        {/* Top 4 lines */}
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "15px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "25px" }}
        />
        <div
          className="absolute w-[75px] top-[25px] h-[50px] right-0"
          style={{
            borderRight: "1px solid black",
          }}
        >
          <div
            className="absolute w-[25px] h-[50px] right-[50px]"
            style={{ borderLeft: "1px solid black" }}
          >
            <div className="flex flex-col text-center text-[16px] leading-[20px] pt-1">
              <span>보</span>
              <span>호</span>
            </div>
          </div>
          <div
            className="absolute w-[25px] h-[50px] right-[25px]"
            style={{ borderLeft: "1px solid black" }}
          >
            <div className="flex flex-col text-center text-[8px] leading-[10px] pt-1">
              <span>A</span>
              <span>U</span>
              <span>T</span>
              <span>H</span>
            </div>
          </div>
          <div
            className="absolute w-[25px] h-[50px] right-0"
            style={{ borderLeft: "1px solid black" }}
          >
            <div className="flex flex-col text-center text-[8px] leading-[10px] pt-1">
              <span>2</span>
              <span>0</span>
              <span>2</span>
              <span>5</span>
            </div>
          </div>
        </div>
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "75px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "85px" }}
        />
        {/* end of top 4 lines */}

        {/* main text */}
        <div className="absolute flex flex-row justify-between w-full text-center top-[100px]">
          <div className="flex flex-col text-center text-2xl gap-2 ml-8 font-bold">
            <span>보</span>
            <span>호</span>
            <span>입</span>
            <span>증</span>
          </div>
          <div
            // className="flex flex-col text-left text-xl gap-2 uppercase"
            className="flex flex-col text-left text-xl gap-2 uppercase origin-left mt-[-140px] mr-8"
            style={{ transform: "rotate(90deg)" }}
          >
            <ul className="flex flex-col gap-2">
              <li className="hover:scale-105 transition-all duration-300">
                <Link href="/demo">demo</Link>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <Link href="https://cameron.so/">author</Link>
              </li>
            </ul>
            <div className="h-[100px] w-[2px] bg-black" />
            <ul className="flex flex-col gap-2">
              <li className="hover:scale-105 transition-all duration-300">
                <Link href="https://github.com/youngbloodcyb/bohoauth">
                  contributing
                </Link>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <Link href="/docs">docs</Link>
              </li>
              <li className="hover:scale-105 transition-all duration-300">
                <Link href="#">bohoauth</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* end main text */}

        {/* windows */}
        <div className="absolute w-[150px] h-[80px] border-2 border-black flex flex-col justify-center items-center top-[300px]">
          <div className="w-[140px] h-[70px] border-2 border-black">
            <div className="h-[68px] w-[2px] bg-black mx-auto" />
          </div>
        </div>
        {/* end windows */}

        {/* middle lines */}
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "400px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "2px solid black", top: "420px" }}
        />
        {/* end of middle lines */}

        {/* doors at bottom */}
        <div className="w-[200px] h-[180px] mt-auto border-2 border-black flex flex-col justify-center items-center">
          <div className="w-[180px] h-[170px] mt-auto border-2 border-black relative">
            <div className="h-[170px] w-[2px] bg-black mx-auto" />
            {/* Door knobs */}
            <div className="absolute w-[12px] h-[24px] border-2 border-black top-1/2 left-[60px] -translate-y-1/2" />
            <div className="absolute w-[12px] h-[24px] border-2 border-black top-1/2 right-[60px] -translate-y-1/2" />
          </div>
        </div>
        {/* end of doors at bottom */}
      </div>

      {/* Right Face */}
      <div
        className="absolute flex items-center justify-center w-[500px] h-[800px]"
        style={{
          transform: "translateX(250px) rotateY(90deg)",
          background: `repeating-linear-gradient(#f2ecdc, #f2ecdc 4px, #000000 4px, #000000 5px)`,
          border: "1px solid black",
          borderLeft: "none",
          borderBottom: "none",
        }}
      >
        {/* Top 4 lines */}
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "15px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "25px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "75px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "85px" }}
        />
        {/* end of top 4 lines */}

        {/* windows */}
        <div
          className="absolute w-[150px] h-[80px] flex flex-col justify-center items-center top-[300px]"
          style={{
            borderTop: "1px solid black",
            borderLeft: "2px solid black",
            borderRight: "2px solid black",
            borderBottom: "2px solid black",
          }}
        >
          <div
            className="w-[140px] h-[70px]"
            style={{
              borderTop: "1px solid black",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="h-[68px] w-[2px] bg-black mx-auto" />
          </div>
        </div>
        {/* end windows */}

        {/* middle lines */}
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "400px" }}
        />
        <div
          className="absolute w-full"
          style={{ borderBottom: "1px solid black", top: "420px" }}
        />
        {/* end of middle lines */}

        {/* bottom windows */}
        <div
          className="absolute w-[150px] h-[160px] flex flex-col justify-center items-center top-[550px]"
          style={{
            borderTop: "1px solid black",
            borderLeft: "2px solid black",
            borderRight: "2px solid black",
            borderBottom: "2px solid black",
          }}
        >
          <div
            className="w-[140px] h-[150px]"
            style={{
              borderTop: "1px solid black",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="h-[148px] w-[2px] bg-black mx-auto" />
          </div>
        </div>
        {/* end bottom windows */}
      </div>

      {/* Top Face */}
      <div
        className="absolute flex items-center justify-center w-[500px] h-[500px]"
        style={{
          transform: "translateY(-250px) rotateX(90deg)",
          background: `repeating-linear-gradient(90deg, #f2ecdc, #f2ecdc 4px, #000000 4px, #000000 5px)`,
          border: "1px solid black",
          borderBottom: "none",
          borderRight: "none",
        }}
      ></div>
    </div>
  );
}
