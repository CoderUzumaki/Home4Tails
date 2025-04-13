import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { ArrowRight } from "lucide-react";
import blogs from "../data/blog";
import { truncateText } from "../utils/formatters";

const BlogSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest From Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tips, stories, and advice to help you and your furry friend live your best lives together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                  <span>{blog.date}</span>
                  <span>{blog.category}</span>
                </div>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {truncateText(blog.excerpt, 95)}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-transparent">
                  Read more <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="gap-2 group">
            View All Articles
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
