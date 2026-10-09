export async function onRequest(context) {
  const { request } = context;
  
  return new Response(JSON.stringify({ message: 'Hello from Functions Folder!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}