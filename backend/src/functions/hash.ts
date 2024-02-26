export async function hashFunction(message:string) : Promise<string> {
  const encodedMsg = new TextEncoder().encode(message);
  const msgDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    encodedMsg
  );
  const msgHash = [...new Uint8Array(msgDigest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return msgHash;
}

