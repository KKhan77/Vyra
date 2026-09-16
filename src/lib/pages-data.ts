export type ContentPage = {
  eyebrow: string; title: string; description: string; image?: string;
  sections: { title: string; text: string; items?: string[] }[];
  links?: { label: string; href: string }[];
};
export const contentPages: Record<string, ContentPage> = {
  'process/technology': {
    eyebrow: 'THE TECHNOLOGY', title: 'The idea leads.\nThe tools follow.', description: 'We don’t believe one AI model should dictate the creative process. We build the right workflow around the work.', image: '/images/pulse-technology.jpg',
    sections: [
      { title: 'Model-agnostic by design.', text: 'Different shots need different strengths. We evaluate tools for the specific requirements of a project: movement, materials, product precision, character continuity, language, and finishing. No single platform defines our creative ceiling.' },
      { title: 'A connected production workflow.', text: 'Generation is one part of the pipeline. We combine it with traditional creative craft and production discipline.', items: ['Concept exploration & previsualization', 'Image and video generation', 'Product, character & environment workflows', 'Editing, compositing, VFX, sound & color'] },
      { title: 'Responsible experimentation.', text: 'We review commercial-use terms, data handling, source materials, and client requirements before selecting a workflow. Sensitive assets are only used in tools approved for the project.' },
    ], links: [{ label: 'Our quality standards', href: '/process/quality' }, { label: 'Explore AI-native production', href: '/services/ai-production' }],
  },
  'process/quality': {
    eyebrow: 'QUALITY & GOVERNANCE', title: 'New technology.\nNo shortcuts.', description: 'A bigger creative canvas still demands a rigorous quality standard. Human judgment is built into every stage.', image: '/images/aura-beauty.jpg',
    sections: [
      { title: 'Creative and brand review.', text: 'A producer and creative lead review the work against the approved direction. Brand consistency, visual continuity, product accuracy, and the intended message are checked before client review.', items: ['Human review at approval milestones', 'Reference-led product and packaging checks', 'Consistent lighting, materials & visual language'] },
      { title: 'Rights, voice, and likeness.', text: 'We review source-asset permissions and applicable tool licenses. Recognizable people, cloned voices, and protected likenesses require documented permission. We do not assume a generated output is automatically cleared for every use.' },
      { title: 'Confidentiality by design.', text: 'Project materials are shared only with the people and approved providers who need them. Confidentiality requirements, retention, and tool restrictions are agreed during onboarding.' },
      { title: 'Delivery that is ready to run.', text: 'Final files are checked against the agreed technical specification, including resolution, frame rate, color, audio, subtitles, safe areas, aspect ratios, naming, and version completeness.' },
    ], links: [{ label: 'AI & content policy', href: '/legal/ai-content-policy' }, { label: 'See our process', href: '/process' }],
  },
  'agencies/process': {
    eyebrow: 'THE AGENCY WORKFLOW', title: 'Your team,\nwith more possibility.', description: 'A production partner that fits into your workflow—not another workflow for your team to manage.', image: '/images/form-fashion.jpg',
    sections: [
      { title: '01 / Agency brief', text: 'Bring us your approved idea, a pitch-stage route, or a production problem. We align on creative ownership, scope, timing, budget, and how you want us to work with your team.' },
      { title: '02 / VYRA production', text: 'Your dedicated producer coordinates art direction, AI production, and finishing. You get a clear plan and agreed milestones, with white-label presentation available.' },
      { title: '03 / Review', text: 'We share work through structured review rounds. Your team consolidates feedback; ours translates it into focused production decisions. Client-facing involvement is always agreed with you.' },
      { title: '04 / Delivery', text: 'Approved masters, campaign versions, and organized assets arrive in the agreed formats. Ongoing content needs can move into a repeatable partner production system.' },
    ], links: [{ label: 'Become a production partner', href: '/agencies/partner' }, { label: 'Quality & confidentiality', href: '/process/quality' }],
  },
  'brands/campaigns': {
    eyebrow: 'FOR BRAND TEAMS', title: 'One campaign.\nA bigger impact.', description: 'An external production team that turns a brand ambition into a connected campaign.', image: '/images/vyra-hero.jpg',
    sections: [
      { title: 'A commercial objective, not a tool demo.', text: 'We start with the outcome: awareness, a launch, product understanding, or audience engagement. The creative direction and delivery plan are built around what the campaign needs to achieve.' },
      { title: 'From strategy to final delivery.', text: 'One team connects concept, pre-production, AI production, post-production, and versioning. You keep a clear view of the work without having to coordinate every production discipline.' },
      { title: 'Designed for your channel plan.', text: 'We plan hero films, short-form edits, product assets, language versions, and paid-media variations as one connected system.', items: ['Launch & awareness campaigns', 'Product & retail campaigns', 'Multi-market campaign packages'] },
    ], links: [{ label: 'Campaign content systems', href: '/services/campaign-systems' }, { label: 'Start your campaign', href: '/start-a-project' }],
  },
  'brands/content-at-scale': {
    eyebrow: 'CONTENT AT SCALE', title: 'More content.\nSame unmistakable brand.', description: 'A considered way to produce for more platforms, products, markets, and moments.', image: '/images/orange-beverage.jpg',
    sections: [
      { title: 'Build once. Create consistently.', text: 'We establish an approved visual language and reusable production assets before expanding into versions. A repeatable system means new content can build on what already works.' },
      { title: 'Volume with a quality bar.', text: 'Every asset still needs a reason to exist. We agree a content matrix, production cadence, review process, and technical standards before scaling.', items: ['Product & SKU variations', 'Audience-specific hooks & messages', 'Social-first content libraries', 'Regional & seasonal adaptations'] },
      { title: 'A flexible production rhythm.', text: 'Project-based packages and ongoing production arrangements can be scoped around your team’s calendar. Deliverable volume, lead times, and pricing are agreed in advance.' },
    ], links: [{ label: 'Brand production systems', href: '/brands/production-systems' }, { label: 'Discuss your content needs', href: '/start-a-project' }],
  },
  'brands/production-systems': {
    eyebrow: 'BRAND PRODUCTION SYSTEMS', title: 'Your brand.\nIts own production engine.', description: 'A long-term creative and production framework for teams that need consistency at scale.', image: '/images/pulse-technology.jpg',
    sections: [
      { title: 'A source of truth for your brand.', text: 'Approved references, product assets, visual rules, and technical specifications form the foundation. Your team’s brand knowledge becomes an actionable production system.' },
      { title: 'A workflow your team can use.', text: 'We define how briefs enter, who approves, what can be reused, and how assets are delivered. The system is built around your people and your governance requirements.' },
      { title: 'Built to keep learning.', text: 'Production retrospectives help improve templates, review steps, and content planning. If performance data is shared, it can inform the next creative brief without turning every decision into an automated one.' },
    ], links: [{ label: 'Our quality framework', href: '/process/quality' }, { label: 'Talk about a production system', href: '/start-a-project' }],
  },
  'about/philosophy': {
    eyebrow: 'OUR PHILOSOPHY', title: 'Creativity is\nthe constant.', description: 'Three principles. One uncompromising point of view.', image: '/images/form-fashion.jpg',
    sections: [
      { title: '01 / Creativity first.', text: 'Technology serves the idea. Not the other way around. We care about work that has a point of view, moves people, and does something meaningful for a brand.' },
      { title: '02 / Human directed.', text: 'AI does not replace creative judgment. Directors, artists, producers, and craftspeople make the decisions that turn possible images into purposeful films.' },
      { title: '03 / Production at scale.', text: 'A great campaign deserves to work harder. We design production systems that let strong ideas travel across formats, markets, and audiences without losing what makes them special.' },
    ], links: [{ label: 'Meet the disciplines behind VYRA', href: '/about/team' }, { label: 'Explore our work', href: '/work' }],
  },
  'about/team': {
    eyebrow: 'THE PEOPLE BEHIND THE POSSIBILITY', title: 'Many disciplines.\nOne creative mind.', description: 'VYRA brings creative leadership, production experience, and emerging technology into the same room.', image: '/images/form-fashion.jpg',
    sections: [
      { title: 'Creative leadership.', text: 'Creative direction and art direction establish the idea, narrative, and visual world. They stay involved throughout production—not just at the beginning.', items: ['Creative Direction', 'Art Direction', 'Executive Production'] },
      { title: 'Production and creative technology.', text: 'Producers, creative technologists, and AI artists build the workflow and make the visual material. Their job is to solve for the creative ambition, not simply to operate tools.', items: ['AI Creative Technology', 'Video & AI Artists', 'Production Management'] },
      { title: 'The finishing craft.', text: 'Editors, compositors, VFX artists, colorists, and sound specialists turn the material into a cohesive experience. Teams are assembled to fit the requirements of each production.', items: ['Editing', 'VFX & Compositing', 'Color', 'Sound Design & Music'] },
    ], links: [{ label: 'Work with us', href: '/careers' }, { label: 'How we work', href: '/process' }],
  },
  careers: {
    eyebrow: 'CAREERS & COLLABORATIONS', title: 'Curious minds.\nCome closer.', description: 'We’re interested in people who care as much about the idea as they do about the craft.', image: '/images/momentum-sport.jpg',
    sections: [
      { title: 'A new kind of production team.', text: 'We collaborate with creative directors, art directors, producers, AI artists, editors, VFX artists, and sound specialists. Tell us where your curiosity and your craft meet.' },
      { title: 'Show us how you think.', text: 'We welcome expressions of interest from independent creatives and potential team members. Share a short introduction, your discipline, availability, and a link to a few projects you are proud of. There are no publicly listed full-time openings at the moment.' },
      { title: 'Send your introduction.', text: 'Use our contact page and select Careers. Please share portfolio links rather than large attachments, and only include work you have permission to show.' },
    ], links: [{ label: 'Introduce yourself', href: '/contact?subject=careers' }, { label: 'Our philosophy', href: '/about/philosophy' }],
  },
  'legal/privacy': {
    eyebrow: 'PRIVACY POLICY', title: 'Your information.\nHandled with care.', description: 'How this website collects and uses the information you choose to share. Updated March 2026.',
    sections: [
      { title: 'What we collect.', text: 'When you submit a project brief, partnership request, or contact form, we collect the contact details, project information, and files you provide. Please do not include unnecessary sensitive personal information in your submission.' },
      { title: 'Why we use it.', text: 'We use submissions to assess your enquiry, prepare a response, discuss a potential engagement, and maintain a record of that conversation. This website does not sell personal information or enroll you in marketing emails automatically.' },
      { title: 'Storage and access.', text: 'Form submissions are stored in the website’s database. Access should be limited to authorized people handling enquiries and maintaining the service. Project-specific confidentiality and retention requirements can be agreed before production.' },
      { title: 'Your choices.', text: 'You may request access, correction, or deletion of information you submitted by contacting us through the contact page and quoting your submission reference. We may need to confirm your identity before acting on a request.' },
      { title: 'Cookies and external links.', text: 'This site uses no advertising or analytics cookies. If you follow an external link, that service’s privacy practices apply. See our cookie policy for more information.' },
    ], links: [{ label: 'Contact us about privacy', href: '/contact?subject=privacy' }, { label: 'Cookie policy', href: '/legal/cookies' }],
  },
  'legal/terms': {
    eyebrow: 'WEBSITE TERMS', title: 'A clear\nunderstanding.', description: 'Terms for using the VYRA website. Updated March 2026.',
    sections: [
      { title: 'Using this website.', text: 'This website introduces VYRA’s approach, capabilities, and creative studies. You may browse and share links for legitimate informational purposes. Do not attempt to disrupt the service, access private submissions, or use forms to send unlawful material.' },
      { title: 'Portfolio and concepts.', text: 'Projects labeled Concept / Spec Work are self-initiated creative explorations. They do not imply a client commission, endorsement, a launched campaign, or measured commercial results.' },
      { title: 'Enquiries and engagements.', text: 'Submitting a brief is an enquiry, not a production contract. Scope, fees, schedule, rights, and delivery responsibilities are established separately in a written agreement before paid work begins.' },
      { title: 'Availability and information.', text: 'We aim to keep this site accurate and available, but content may change and uninterrupted access is not guaranteed. Project-specific commitments are governed by the signed production agreement.' },
    ], links: [{ label: 'Production terms', href: '/legal/production-terms' }, { label: 'Intellectual property', href: '/legal/intellectual-property' }],
  },
  'legal/cookies': {
    eyebrow: 'COOKIE POLICY', title: 'Less tracking.\nMore creating.', description: 'A simple website should have a simple cookie policy. Updated March 2026.',
    sections: [
      { title: 'No advertising or analytics cookies.', text: 'This implementation does not set marketing, analytics, or cross-site tracking cookies. Portfolio filters and media controls use temporary page state rather than persistent tracking.' },
      { title: 'Essential functionality.', text: 'The hosting environment may process technical request information necessary to deliver and protect the website. Project enquiry data is only submitted when you send a form.' },
      { title: 'External services.', text: 'Locally hosted fonts, artwork, and the concept reel load without third-party media embeds. Following an external website link may allow that destination to apply its own cookies and policies.' },
    ], links: [{ label: 'Privacy policy', href: '/legal/privacy' }],
  },
  'legal/ai-content-policy': {
    eyebrow: 'AI & CONTENT POLICY', title: 'Imagination,\nwith responsibility.', description: 'Our approach to AI-assisted content, creative integrity, and responsible production. Updated March 2026.',
    sections: [
      { title: 'Human accountability.', text: 'People direct, select, refine, and review the work. We do not treat generated outputs as inherently accurate, licensed, or suitable for commercial release.' },
      { title: 'Consent and authenticity.', text: 'We require appropriate permission for identifiable likenesses, cloned voices, and supplied protected materials. We do not create deceptive impersonations or present synthetic events as authentic documentary footage.' },
      { title: 'Project-specific review.', text: 'Tools, source materials, licensing terms, product claims, and disclosure requirements are reviewed in the context of a project’s markets and intended use. The approved production plan records relevant limitations and responsibilities.' },
      { title: 'Creative studies on this website.', text: 'The portfolio contains AI-generated, self-initiated visual studies. Brand names within these concepts are creative placeholders; no client relationships or campaign performance are claimed. The concept reel is an animated presentation of these visual studies.' },
    ], links: [{ label: 'Quality & governance', href: '/process/quality' }, { label: 'Intellectual property', href: '/legal/intellectual-property' }],
  },
  'legal/intellectual-property': {
    eyebrow: 'INTELLECTUAL PROPERTY', title: 'Creative work.\nClear rights.', description: 'A considered approach to the material that goes into—and comes out of—a production. Updated March 2026.',
    sections: [
      { title: 'Website materials.', text: 'Website copy, design, and visual studies are provided for viewing and evaluation. Do not reuse the portfolio as your own work or imply a relationship with a brand or client that is not documented.' },
      { title: 'Client-supplied assets.', text: 'Clients are responsible for confirming that they have permission to provide logos, images, product references, scripts, music, voices, and likenesses for the agreed purpose. We discuss any unclear rights before using material in production.' },
      { title: 'Production rights.', text: 'Ownership, usage rights, territories, duration, source-file delivery, and third-party limitations are specified in the project agreement. AI-assisted outputs may have different copyright treatment across jurisdictions; no blanket exclusivity is assumed.' },
      { title: 'Questions or concerns.', text: 'If you believe material on this website affects your rights, contact us with the relevant page, a description of the concern, and information that helps us evaluate it.' },
    ], links: [{ label: 'Contact us', href: '/contact?subject=rights' }],
  },
  'legal/production-terms': {
    eyebrow: 'PRODUCTION TERMS', title: 'Good work starts\nwith clarity.', description: 'The foundations of a well-run production. Final terms are set out in your project agreement. Updated March 2026.',
    sections: [
      { title: 'Scope and schedule.', text: 'Before production begins, we agree the brief, deliverable list, technical formats, approval milestones, client inputs, and proposed timeline. Schedule changes caused by new requirements or delayed feedback are discussed transparently.' },
      { title: 'Fees and payment.', text: 'Fees, payment stages, taxes, third-party expenses, and cancellation arrangements are documented in the proposal or production agreement. A website enquiry does not create a payment obligation.' },
      { title: 'Review and revisions.', text: 'The agreement specifies included review rounds and the point at which major changes constitute a scope change. Consolidated feedback helps keep the production focused and the schedule predictable.' },
      { title: 'Delivery, rights, and confidentiality.', text: 'Final deliverables, usage rights, project confidentiality, source files, and retention are agreed in writing. Any voice, likeness, music, or other third-party licensing restrictions are identified for the planned use.' },
    ], links: [{ label: 'Discuss a project', href: '/start-a-project' }, { label: 'Quality & governance', href: '/process/quality' }],
  },
};
