export default function handler(req, res) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  
  res.status(200).json({ ip });
}

// For App Router (app/api/get-ip/route.js):
export async function GET(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.ip;
  
  return Response.json({ ip });
}
