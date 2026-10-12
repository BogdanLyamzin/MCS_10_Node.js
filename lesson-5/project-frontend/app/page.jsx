const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3000";

async function getContacts() {
  const response = await fetch(`${backendUrl}/api/contacts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  return response.json();
}

export default async function Home() {
  let contacts = [];
  let error = false;

  try {
    contacts = await getContacts();
  } catch {
    error = true;
  }

  return (
    <main>
      <h1>Contacts</h1>
      <p className="intro">This list comes from the backend API.</p>

      {error ? (
        <p role="alert">Could not load contacts. Check that the backend is running.</p>
      ) : contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <h2>{contact.name}</h2>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
