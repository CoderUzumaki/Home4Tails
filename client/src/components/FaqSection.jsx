import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/accordion";
  import faqs from "../data/faqs";

  const FaqSection = () => {
    return (
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our adoption process and how you can help.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id.toString()}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Can't find an answer to your question?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  };

  export default FaqSection;
