import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import { companyFormSchema, type CompanyFormValues } from "@/schemas/company";
import OrderSummary from "./OrderSummary";
import {
  formatCPFCNPJ,
  formatPhone,
  formatCEP,
  stripMask,
} from "@/lib/masks";
import { useState } from "react";

const StepCompanyInfo = () => {
  const { state, submitCompanyInfo, goToStep } = useSignupFlow();
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: state.companyData || {
      name: "",
      cpfCnpj: "",
      email: "",
      phone: "",
      address: {
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      contactPerson: {
        name: "",
        email: "",
        phone: "",
        role: "",
      },
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const handleCepBlur = async () => {
    const cep = stripMask(watch("address.zipCode"));
    if (cep.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue("address.street", data.logradouro || "", { shouldValidate: true });
        setValue("address.neighborhood", data.bairro || "", { shouldValidate: true });
        setValue("address.city", data.localidade || "", { shouldValidate: true });
        setValue("address.state", data.uf || "", { shouldValidate: true });
      }
    } catch {
      // silently fail - user can fill manually
    } finally {
      setIsFetchingCep(false);
    }
  };

  const onSubmit = (data: CompanyFormValues) => {
    submitCompanyInfo(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 space-y-6"
      >
        {/* Company Data */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">
            Dados da Empresa
          </h4>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Nome da Empresa *</Label>
              <Input
                id="name"
                placeholder="Nome da empresa"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cpfCnpj">CPF / CNPJ *</Label>
              <Input
                id="cpfCnpj"
                placeholder="000.000.000-00"
                {...register("cpfCnpj")}
                onChange={(e) => {
                  const formatted = formatCPFCNPJ(e.target.value);
                  setValue("cpfCnpj", formatted, { shouldValidate: true });
                }}
              />
              {errors.cpfCnpj && (
                <p className="text-xs text-destructive mt-1">{errors.cpfCnpj.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="empresa@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                {...register("phone")}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue("phone", formatted, { shouldValidate: true });
                }}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">
            Endereço
          </h4>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="zipCode">CEP *</Label>
              <div className="relative">
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  {...register("address.zipCode")}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    setValue("address.zipCode", formatted, { shouldValidate: true });
                  }}
                  onBlur={handleCepBlur}
                />
                {isFetchingCep && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
              {errors.address?.zipCode && (
                <p className="text-xs text-destructive mt-1">{errors.address.zipCode.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="street">Rua *</Label>
              <Input
                id="street"
                placeholder="Rua / Avenida"
                {...register("address.street")}
              />
              {errors.address?.street && (
                <p className="text-xs text-destructive mt-1">{errors.address.street.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                placeholder="123"
                {...register("address.number")}
              />
              {errors.address?.number && (
                <p className="text-xs text-destructive mt-1">{errors.address.number.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                placeholder="Sala, andar..."
                {...register("address.complement")}
              />
            </div>

            <div>
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                placeholder="Bairro"
                {...register("address.neighborhood")}
              />
              {errors.address?.neighborhood && (
                <p className="text-xs text-destructive mt-1">{errors.address.neighborhood.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                placeholder="Cidade"
                {...register("address.city")}
              />
              {errors.address?.city && (
                <p className="text-xs text-destructive mt-1">{errors.address.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                placeholder="UF"
                maxLength={2}
                {...register("address.state")}
                onChange={(e) => {
                  setValue("address.state", e.target.value.toUpperCase(), { shouldValidate: true });
                }}
              />
              {errors.address?.state && (
                <p className="text-xs text-destructive mt-1">{errors.address.state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">
            Pessoa de Contato
          </h4>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="contactName">Nome *</Label>
              <Input
                id="contactName"
                placeholder="Nome completo"
                {...register("contactPerson.name")}
              />
              {errors.contactPerson?.name && (
                <p className="text-xs text-destructive mt-1">{errors.contactPerson.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactEmail">E-mail *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contato@email.com"
                {...register("contactPerson.email")}
              />
              {errors.contactPerson?.email && (
                <p className="text-xs text-destructive mt-1">{errors.contactPerson.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactPhone">Telefone *</Label>
              <Input
                id="contactPhone"
                placeholder="(00) 00000-0000"
                {...register("contactPerson.phone")}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue("contactPerson.phone", formatted, { shouldValidate: true });
                }}
              />
              {errors.contactPerson?.phone && (
                <p className="text-xs text-destructive mt-1">{errors.contactPerson.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactRole">Cargo *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("contactPerson.role", value, { shouldValidate: true })
                }
                defaultValue={state.companyData?.contactPerson.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proprietario">Proprietário(a)</SelectItem>
                  <SelectItem value="diretor">Diretor(a)</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="coordenador">Coordenador(a)</SelectItem>
                  <SelectItem value="analista">Analista</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.contactPerson?.role && (
                <p className="text-xs text-destructive mt-1">{errors.contactPerson.role.message}</p>
              )}
            </div>
          </div>
        </div>

        {state.error && (
          <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3">
            {state.error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => goToStep(1)}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            className="flex-1 hero-button"
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Criando conta...
              </>
            ) : (
              "Continuar"
            )}
          </Button>
        </div>
      </form>

      {/* Order Summary - desktop sidebar */}
      {state.selectedPlan && (
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-4">
            <OrderSummary plan={state.selectedPlan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCompanyInfo;
