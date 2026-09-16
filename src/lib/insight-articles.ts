export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  imageCredit?: { name: string; url: string };
  date: string;
  readTime: string;
  sections: { title: string; text: string }[];
};

export const insightCategories = [
  'All insights', 'AI Filmmaking', 'Commercial Production', 'Creative Technology',
  'Advertising', 'AI & Marketing', 'Production Trends', 'Case Studies', 'Behind the Scenes',
];

// All journal images are illustrative placeholders. Replace these local image paths
// and their alt text / credit information with approved editorial assets when ready.
export const insights: Insight[] = [
  {
    slug: 'ai-is-changing-production-not-creativity', category: 'AI Filmmaking',
    title: 'AI is changing production. Not creativity.',
    excerpt: 'The tools are evolving. The need for a genuinely good idea isn’t going anywhere. A perspective on what changes—and what never should.',
    image: '/images/insights/filmmaking.jpg',
    imageAlt: 'Illustrative placeholder: a cinema camera and its monitor on a film set.',
    imageCredit: { name: 'Emanuel Pedro / Pexels', url: 'https://www.pexels.com/photo/professional-film-camera-setup-on-movie-set-32610376/' },
    date: 'March 18, 2026', readTime: '4 min read',
    sections: [
      { title: 'The idea still comes first.', text: 'A beautiful image is not automatically an effective commercial. It still needs an audience, an intention, and a reason for someone to care. Generative technology expands the visual vocabulary available to a creative team, but it does not decide which story is worth telling.' },
      { title: 'A different production canvas.', text: 'Environments, materials, and camera possibilities that once required extensive physical infrastructure can now be explored earlier. That changes the economics of experimentation. It gives a director more room to test a visual route before committing the whole campaign to it.' },
      { title: 'More tools. More judgment.', text: 'The important work is selection: what to keep, what to refine, and what to throw away. Art direction, editing, sound, and brand understanding become more—not less—important when the volume of possible images increases. At VYRA, every workflow starts with a human point of view and ends with human review.' },
    ],
  },
  {
    slug: 'one-hero-film-30-campaign-assets', category: 'AI & Marketing',
    title: 'One hero film. An entire campaign universe.',
    excerpt: 'Why the smartest campaigns are designed as content systems from day one.',
    image: '/images/orange-beverage.jpg',
    imageAlt: 'Illustrative placeholder: an orange beverage concept surrounded by citrus and splashing liquid.',
    date: 'March 12, 2026', readTime: '5 min read',
    sections: [
      { title: 'Stop treating versions as an afterthought.', text: 'A hero film can be the beginning of a campaign rather than its only meaningful asset. Planning a modular shot library, alternate hooks, product details, and calls to action at the concept stage makes later versions more intentional.' },
      { title: 'Design a system before making assets.', text: 'Start with the channel plan. A vertical first-frame hook serves a different purpose from a cinema opening. Define the campaign’s constants—color, product truth, voice—and its variables: language, pacing, framing, and audience message.' },
      { title: 'Thirty is a plan, not a promise.', text: 'A master film could lead to cutdowns, language versions, product stills, and audience adaptations. The exact number depends on scope, budget, and the quality bar. We agree a delivery matrix before production so every version has a purpose and an owner.' },
    ],
  },
  {
    slug: 'what-happens-when-a-commercial-starts-with-ai', category: 'Behind the Scenes',
    title: 'What happens when a commercial starts with AI?',
    excerpt: 'From a first spark to the final frame: inside a human-directed production workflow.',
    image: '/images/insights/creative-process.jpg',
    imageAlt: 'Illustrative placeholder: a creative workspace with sketches and a visual reference board.',
    imageCredit: { name: 'Yuliya Duzhaya / Pexels', url: 'https://www.pexels.com/photo/fashion-workspace-with-mood-board-and-sketches-37471992/' },
    date: 'March 5, 2026', readTime: '6 min read',
    sections: [
      { title: 'The brief is still the brief.', text: 'We begin with the business objective, the audience, the message, and the limits. An AI workflow does not remove the need for a clear strategy. In fact, a precise brief is one of the best ways to make exploration useful instead of endless.' },
      { title: 'Create the rules of the world.', text: 'A visual bible records the lighting, lenses, color, materials, product references, and character decisions. These rules guide generation and help artists evaluate individual shots against the same creative standard.' },
      { title: 'Finish it like a film.', text: 'Generated clips are production material, not finished commercials. Editing establishes meaning. Compositing creates continuity. Sound gives the world weight. Color brings it together. The final review checks both the creative idea and the practical delivery specification.' },
    ],
  },
  {
    slug: 'ai-video-vs-traditional-production', category: 'Production Trends',
    title: 'AI video vs. traditional production: the better question.',
    excerpt: 'It isn’t either-or. It’s about choosing the right approach for the idea.',
    image: '/images/insights/editing.jpg',
    imageAlt: 'Illustrative placeholder: an editor working with footage and color on two studio monitors.',
    imageCredit: { name: 'Ron Lach / Pexels', url: 'https://www.pexels.com/photo/man-sitting-at-the-desk-and-editing-footage-on-a-computer-8102676/' },
    date: 'February 26, 2026', readTime: '4 min read',
    sections: [
      { title: 'Start with the requirement.', text: 'Some stories need a real performance, a real place, or documentary truth. Others benefit from environments and visual effects that are difficult to capture physically. The creative requirement should determine the production method.' },
      { title: 'Hybrid is often the answer.', text: 'A campaign might combine a photographed product, a generated environment, traditional animation, and a recorded voice. The most useful distinction is not old versus new. It is appropriate versus inappropriate for the shot.' },
      { title: 'Compare the whole production.', text: 'Evaluate timelines, revision needs, rights, product accuracy, finishing, and deliverables—not just the cost of generating a clip. A considered plan makes the trade-offs visible before production begins.' },
    ],
  },
  {
    slug: 'brand-consistency-in-ai-production', category: 'Creative Technology',
    title: 'New possibilities. Still unmistakably your brand.',
    excerpt: 'How to build brand consistency into an AI-native production workflow.',
    image: '/images/aura-beauty.jpg',
    imageAlt: 'Illustrative placeholder: a golden beauty-product concept with soft sculptural silk.',
    date: 'February 19, 2026', readTime: '5 min read',
    sections: [
      { title: 'Give the brand a visual source of truth.', text: 'An approved reference library should include product photography, packaging, color values, typography, materials, and examples of acceptable art direction. The better the source material, the more useful the quality review becomes.' },
      { title: 'Review at the right moments.', text: 'Approve the visual direction before generating a full shot list. Check a representative hero shot before scaling the workflow. Structured approvals catch expensive drift early and keep stakeholders aligned.' },
      { title: 'Consistency is a human responsibility.', text: 'A model does not know which millimeter of packaging matters or whether a visual claim is acceptable. Artists, producers, and brand teams must check product accuracy, message, and context. Technology supports that responsibility; it does not replace it.' },
    ],
  },
  {
    slug: 'a-better-brief-a-better-film', category: 'Commercial Production',
    title: 'A better brief makes a better film.',
    excerpt: 'The questions worth answering before anyone thinks about the first shot.',
    image: '/images/insights/moodboard.jpg',
    imageAlt: 'Illustrative placeholder: photographs, notes, and visual references arranged on a creative moodboard.',
    imageCredit: { name: 'Fiona Murray / Pexels', url: 'https://www.pexels.com/photo/a-pile-of-papers-with-various-items-on-top-17789974/' },
    date: 'February 12, 2026', readTime: '4 min read',
    sections: [
      { title: 'Start with what needs to change.', text: 'A useful brief describes the difference a film should make. Do people need to understand a new product, reconsider a familiar brand, or take a specific action? A clear objective gives the creative team something more meaningful to solve than filling thirty seconds.' },
      { title: 'Separate the essentials from the possibilities.', text: 'Approved product claims, mandatory branding, usage markets, and delivery specifications are essential inputs. A reference film is a conversation starter, not necessarily a rigid template. Making that distinction creates room for an original response without losing the business requirement.' },
      { title: 'Agree how decisions will be made.', text: 'Name the stakeholders, define the approval stages, and be honest about budget and timing. These are creative enablers. When a team understands the boundaries and knows who can approve the work, it can spend more energy making the film better.' },
    ],
  },
  {
    slug: 'attention-is-only-the-beginning', category: 'Advertising',
    title: 'Attention is only the beginning.',
    excerpt: 'A scroll-stopping image gets you noticed. A strong idea gives people a reason to remember.',
    image: '/images/momentum-sport.jpg',
    imageAlt: 'Illustrative placeholder: a bright lime running-shoe concept against a cobalt-blue track.',
    date: 'February 5, 2026', readTime: '3 min read',
    sections: [
      { title: 'The first frame opens a door.', text: 'An unusual image can interrupt a familiar feed. But stopping someone briefly is not the same as communicating a message. The next few seconds need to make the visual interesting in a way that belongs to the brand.' },
      { title: 'Give the spectacle a purpose.', text: 'A distinctive product behavior, an unexpected setting, or a compelling material can all earn attention. We ask what each choice communicates. If it has no relationship to the promise of the campaign, it may be decoration rather than an idea.' },
      { title: 'Plan the memory, not only the hook.', text: 'Think about what someone should remember after the film is gone: a benefit, a feeling, a product, a point of view. Carry that through the edit, sound, and final message. A campaign works as a sequence of decisions, not just a collection of striking frames.' },
    ],
  },
  {
    slug: 'building-an-impossible-world', category: 'Case Studies',
    title: 'Building a world beyond the ordinary.',
    excerpt: 'A closer look at the light, scale, and creative decisions behind our NOMAD concept study.',
    image: '/images/vyra-hero.jpg',
    imageAlt: 'Illustrative placeholder: the NOMAD automotive concept in a desert beneath a monumental sun.',
    date: 'January 29, 2026', readTime: '6 min read',
    sections: [
      { title: 'A world with one clear idea.', text: 'Our self-initiated NOMAD study began with a simple creative territory: the freedom to move beyond the familiar. Rather than lead with a feature list, we explored an automotive visual world built around distance, atmosphere, and possibility. This is concept work, not a commissioned campaign.' },
      { title: 'Scale makes the feeling tangible.', text: 'A small vehicle beneath a monumental sun creates a deliberate tension between precision and vastness. The desert gives the frame room to breathe. Dark foreground material and warm atmospheric light make the product feel grounded even as the setting becomes extraordinary.' },
      { title: 'Consistency comes from selection.', text: 'We judged the visual studies against the same composition, lighting, and material references. Product form, contact with the ground, and credible reflections mattered as much as the landscape. The result is a visual direction to develop—not a claim of real-world campaign performance.' },
    ],
  },
  {
    slug: 'the-model-is-not-the-director', category: 'Creative Technology',
    title: 'The model is not the director.',
    excerpt: 'Why a model-agnostic approach starts with creative judgment, not a favorite tool.',
    image: '/images/pulse-technology.jpg',
    imageAlt: 'Illustrative placeholder: a silver headphone concept framed by chrome curves and reflected light.',
    date: 'January 22, 2026', readTime: '5 min read',
    sections: [
      { title: 'Choose for the shot.', text: 'Different production requirements call for different capabilities. A detailed product study, a subtle movement, and a broad environment are not the same problem. Choosing a tool after defining the shot keeps the workflow accountable to the creative objective.' },
      { title: 'Keep the direction outside the tool.', text: 'The visual reference system, approved script, storyboard, and brand rules should be understandable without access to any particular platform. This lets artists evaluate results consistently and change tools when a production requirement calls for it.' },
      { title: 'Build a workflow, not a dependency.', text: 'A reliable pipeline connects generation with compositing, editing, color, sound, and review. Commercial-use terms and data handling also influence the choice of tools. The value lies in how the team combines and directs those capabilities, not in committing every idea to one model.' },
    ],
  },
  {
    slug: 'the-craft-between-the-frames', category: 'Behind the Scenes',
    title: 'The craft between the frames.',
    excerpt: 'Editing, sound, and the small decisions that turn production material into a film.',
    image: '/images/form-fashion.jpg',
    imageAlt: 'Illustrative placeholder: an ivory fashion concept moving through a dark volcanic landscape.',
    date: 'January 15, 2026', readTime: '4 min read',
    sections: [
      { title: 'A shot is not a story.', text: 'Production creates possibilities. Editing gives those possibilities an order, a rhythm, and a relationship. An image that is compelling on its own may be wrong for the sequence. The edit makes that distinction visible.' },
      { title: 'Sound gives the world weight.', text: 'An environment feels different with a low atmospheric tone, a breath, a material detail, or deliberate silence. Sound design is not a finishing decoration. It can establish space, direct attention, and connect shots that would otherwise feel disconnected.' },
      { title: 'The last decisions matter.', text: 'Small changes to timing, transitions, color, and the final message can make the difference between an asset collection and a coherent film. We protect time for these decisions and review the result in its intended format, not only on the editing screen.' },
    ],
  },
];
