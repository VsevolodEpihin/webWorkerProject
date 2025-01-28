export async function saveText(text: string | null, textName: string) {
  const response = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, textName }),
  });

  return response.text();
}

export async function getTextsList() {
  const response = await fetch('/list');
  return response.json();
}

export async function loadText(nameText: string) {
  const response = await fetch(`/load/${nameText}`);

  if (response.ok) {
      return response.json();
  } else {
      throw new Error('Text not found');
  }
}
