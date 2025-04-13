import { Card, CardContent } from "..//components/ui/card";
import { QuoteIcon } from "lucide-react";
import testimonials from "..//data/testimonials";

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from families who found their perfect pet companions through Home4Tails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
