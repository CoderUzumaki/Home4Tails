import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "../components/ui/use-toast";
import { ArrowRight, User, AtSign, Lock, Check } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-muted-foreground">
            Join our community of pet lovers and start your adoption journey
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    minLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 py-2">
                <Checkbox
                  id="agree-terms"
                  checked={agreeTerms}
                  onCheckedChange={setAgreeTerms}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="agree-terms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 bg-muted/20 rounded-lg p-4 border border-muted">
          <div className="flex gap-2 items-center">
            <div className="bg-primary/10 rounded-full p-1">
              <Check size={14} className="text-primary" />
            </div>
            <p className="text-sm">Create and manage adoption applications</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-primary/10 rounded-full p-1">
              <Check size={14} className="text-primary" />
            </div>
            <p className="text-sm">Save favorite pets to view later</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-primary/10 rounded-full p-1">
              <Check size={14} className="text-primary" />
            </div>
            <p className="text-sm">Receive updates on pets and events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
