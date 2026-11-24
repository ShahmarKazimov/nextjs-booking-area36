// Beds24 booking iframe. Only the Beds24 `lang` param differs from the site locale:
// the Azerbaijani texts are stored under Beds24's Turkish ("tr") language slot.
export default function Beds24Embed({
  propId,
  roomId,
  locale,
  title,
  checkin,
  numnight,
  numadult,
  numchild,
}) {
  const params = new URLSearchParams({
    propid: propId,
    hideheader: "yes",
    hidefooter: "yes",
    referer: "area36.az",
    lang: locale === "az" ? "tr" : locale === "ru" ? "ru" : "en",
  });
  if (checkin && numnight) {
    params.set("checkin", checkin);
    params.set("numnight", String(numnight));
    if (numadult) params.set("numadult", String(numadult));
    if (numchild != null) params.set("numchild", String(numchild));
    if (roomId) params.set(`br1-${roomId}`, "Book");
  }

  return (
    <iframe
      src={`https://beds24.com/booking2.php?${params.toString()}`}
      title={title}
      width="800"
      height="2000"
      style={{ maxWidth: "100%", width: "100%", border: "none", overflow: "auto" }}
    />
  );
}
