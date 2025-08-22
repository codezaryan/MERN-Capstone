import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Heart, FileText, Users, BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Blog Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">BlogSpace</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A community platform for writers and readers to share ideas, stories, and knowledge. 
              Join us to discover new perspectives and connect with like-minded people.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">All Posts</a>
              </li>
              <li className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Top Writers</a>
              </li>
              <li className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest posts delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border-border"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>contact@blogspace.com</span>
            </div>
          </div>
        </div>

        {/* Improved Responsive Bottom Bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-sm text-muted-foreground flex items-center flex-wrap justify-center md:justify-start">
              <span className="whitespace-nowrap">© 2024 BlogSpace.</span>
              <span className="flex items-center mx-1 whitespace-nowrap">
                Made with <Heart className="h-4 w-4 mx-1 text-destructive" /> for the community.
              </span>
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors whitespace-nowrap">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors whitespace-nowrap">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors whitespace-nowrap">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}