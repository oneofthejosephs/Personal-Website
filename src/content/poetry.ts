export type Poem = {
    slug: string;
    category: string;
    title: string;
    summary?: string;
    tags?: string[]
    body: string;
  };

  export const poems: Poem[] = [
    {
        slug: "poem-1",
        category: "Poetry",
        title: "I Stick Around Till the Music Stops",
        summary: "Collection 1, I Stick Around Till the music Stops.",
        tags: ["Poem"],
        body:
          `Pay no mind to the fact that we're trampling on each other's toes,
          \nThe music is playing
          \nAnd boy is it good!
          \nSo let's continue to jive.
          \n
          \nThe music sounds different to us so our rhythms aren't quite the same,
          \nBut the music is good!
          \nSo let's continue to jive.
          \n
          \nWe spent the whole session trying to predict each others next move.
          \nWe got it wrong.
          \nEvery time.
          \nBut the music is good!
          \nSo lets continue to jive.
          \n
          \nWhen the band stops playing from fatigue,
          \nAnd they will.
          \nI'll skip away thinking very fondly of our frenzied act.
          \nI should have mentioned,
          \nI only stick around till the music stops.
          \n
          \n-A`,
      },
      {
        slug: "poem-2",
        category: "Poetry",
        title: "Oklahoma",
        summary: "Collection 1, I Stick Around Till the music Stops.",
        tags: ["Poem", "Journey"],
        body:
          `Powered by the wind like the turbine farms I coast past,
          \nMy eyes grazing on the green like the cattle I so often see.
          \nThe Sun and cumulus clouds hang like vivid paintings on the most brilliant blue canvas.
          \nMy soul is galloping on these endless roads like a foal in a prairie
          \n
          \n-A`,
      },
  ];