
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     console.log("Piston request:", JSON.stringify(body, null, 2));
//     console.log("Piston URL:", process.env.PISTON_URL);

//     const response = await fetch(
//       `${process.env.PISTON_URL}/api/v2/execute`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await response.json();

//     console.log("Piston response:", JSON.stringify(data, null, 2));

//     return NextResponse.json(data, {
//       status: response.status,
//     });
//   } catch (error) {
//     console.error("Execution error:", error);

//     return NextResponse.json(
//       {
//         message: "Failed to execute code",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const pistonUrl = process.env.PISTON_URL;
    const apiKey = process.env.ONLINECOMPILER_API_KEY;

    if (!pistonUrl || !apiKey) {
      return NextResponse.json(
        { message: "Code execution service is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${pistonUrl.replace(/\/$/, "")}/execute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Execution error:", error);

    return NextResponse.json(
      { message: "Failed to execute code" },
      { status: 500 }
    );
  }
}
