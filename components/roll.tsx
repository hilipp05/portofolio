/**
 * Teks yang "berguling" saat hover atau fokus: salinan kedua naik menggantikan
 * yang pertama. Murni CSS, jadi aman dipakai di server component.
 * Tujuan: memberi tanda bahwa elemen ini bisa diklik. `each` menggulung per huruf.
 */
export function Roll({ text, each = false }: { text: string; each?: boolean }) {
  const parts = each ? [...text] : [text];
  const row = (hidden: boolean) => (
    <span className="roll__row" aria-hidden={hidden || undefined}>
      {parts.map((c, i) => (
        <span className="roll__c" style={{ "--i": i } as React.CSSProperties} key={i}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
  return (
    <span className="roll">
      <span className="visually-hidden">{text}</span>
      {row(true)}
      {row(true)}
    </span>
  );
}
