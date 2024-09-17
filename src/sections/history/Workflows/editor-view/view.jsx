import { useState } from 'react';

import { Editor } from 'src/components/editor';

// ----------------------------------------------------------------------

const defaultValue = `

<pre><code class="language-javascript">for (var i=1; i &#x3C;= 20; i++) {
  if (i % 15 == 0)
    return "FizzBuzz"
  else if (i % 3 == 0)
    return "Fizz"
  else if (i % 5 == 0)
    return "Buzz"
  else
    return i
  }</code></pre>
`;

// ----------------------------------------------------------------------

export function EditorView() {
  const [checked, setChecked] = useState(true);

  const [content, setContent] = useState(defaultValue);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Editor
      fullItem={checked}
      value={content}
      onChange={(value) => setContent(value)}
      sx={{ maxHeight: 720 }}
    />
  );
}
