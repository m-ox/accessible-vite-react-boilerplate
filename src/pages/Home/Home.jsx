import Button from '../../components/Button/Button';

export default function Home() {
  return (
    <div>
      <p>Is this a form?</p>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <Button variant="solid" color="indigo">Yes</Button>
        <Button variant="solid" color="gray">No</Button>
      </div>
    </div>
  );
}
