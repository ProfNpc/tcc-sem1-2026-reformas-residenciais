package br.com.belval.refores.model.controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.belval.refores.model.Pedidos;
import br.com.belval.refores.model.Pessoa;
import br.com.belval.refores.model.Prestador;
import br.com.belval.refores.model.PessoaRepository.PedidosRepository;
import br.com.belval.refores.model.PessoaRepository.PessoaRepository;
import br.com.belval.refores.model.PessoaRepository.PrestadorRepository;

@RestController
@RequestMapping("/Dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final PedidosRepository pedidosRepository;
    private final PessoaRepository pessoaRepository;
    private final PrestadorRepository prestadorRepository;

    public DashboardController(
            PedidosRepository pedidosRepository,
            PessoaRepository pessoaRepository,
            PrestadorRepository prestadorRepository) {
        this.pedidosRepository = pedidosRepository;
        this.pessoaRepository = pessoaRepository;
        this.prestadorRepository = prestadorRepository;
    }

    private boolean ativo(String deletado) {
        return deletado == null
                || !deletado.trim().equalsIgnoreCase("SIM");
    }

    private String texto(String valor) {
        return valor == null || valor.trim().isEmpty()
                ? "Não informado"
                : valor.trim();
    }

    private String normalizarStatus(String status) {
        return texto(status).toUpperCase(Locale.ROOT);
    }

    private List<Map<String, Object>> contarPorCampo(
            List<Pedidos> pedidos,
            java.util.function.Function<Pedidos, String> obterCampo) {

        Map<String, Long> contagem = new HashMap<>();

        for (Pedidos pedido : pedidos) {
            String valor = texto(obterCampo.apply(pedido));
            contagem.merge(valor, 1L, Long::sum);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();

        contagem.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue()
                        .reversed()
                        .thenComparing(Map.Entry.comparingByKey()))
                .forEach(item -> {
                    Map<String, Object> linha = new LinkedHashMap<>();
                    linha.put("label", item.getKey());
                    linha.put("total", item.getValue());
                    resultado.add(linha);
                });

        return resultado;
    }

    private List<Map<String, Object>> contarStatus(
            List<Pedidos> pedidos) {

        return contarPorCampo(
                pedidos,
                pedido -> normalizarStatus(pedido.getStatus()));
    }

    private List<Map<String, Object>> contarServicos(
            List<Pedidos> pedidos) {

        return contarPorCampo(
                pedidos,
                Pedidos::getServico);
    }

    private List<Map<String, Object>> contarPorMes(
            List<Pedidos> pedidos) {

        Map<YearMonth, Long> contagem = new TreeMap<>();

        for (Pedidos pedido : pedidos) {
            LocalDate data = pedido.getDataDesejada();

            if (data != null) {
                YearMonth mes = YearMonth.from(data);
                contagem.merge(mes, 1L, Long::sum);
            }
        }

        DateTimeFormatter formato =
                DateTimeFormatter.ofPattern("MM/yyyy");

        List<Map<String, Object>> resultado = new ArrayList<>();

        contagem.forEach((mes, total) -> {
            Map<String, Object> linha = new LinkedHashMap<>();
            linha.put("label", mes.format(formato));
            linha.put("total", total);
            resultado.add(linha);
        });

        return resultado;
    }

    private Map<String, Object> montarResumoPedidos(
            List<Pedidos> pedidos) {

        Map<String, Object> resumo = new LinkedHashMap<>();

        resumo.put("totalPedidos", pedidos.size());
        resumo.put("pedidosPorStatus", contarStatus(pedidos));
        resumo.put("servicosMaisSolicitados", contarServicos(pedidos));
        resumo.put("pedidosPorMes", contarPorMes(pedidos));

        return resumo;
    }

    // GET http://127.0.0.1:8089/Dashboard/admin
    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> dashboardAdmin() {

        List<Pedidos> pedidos = pedidosRepository.findAll();
        List<Pessoa> pessoasAtivas = new ArrayList<>();
        List<Prestador> prestadoresAtivos = new ArrayList<>();

        for (Pessoa pessoa : pessoaRepository.findAll()) {
            if (ativo(pessoa.getDeletado())) {
                pessoasAtivas.add(pessoa);
            }
        }

        for (Prestador prestador : prestadorRepository.findAll()) {
            if (ativo(prestador.getDeletado())) {
                prestadoresAtivos.add(prestador);
            }
        }

        Map<Integer, String> nomesPrestadores = new HashMap<>();

        for (Prestador prestador : prestadoresAtivos) {
            nomesPrestadores.put(prestador.getId(), prestador.getNome());
        }

        Map<Integer, Long> pedidosPorPrestador = new HashMap<>();

        for (Pedidos pedido : pedidos) {
            if (pedido.getIdPrestador() != null) {
                pedidosPorPrestador.merge(
                        pedido.getIdPrestador(), 1L, Long::sum);
            }
        }

        List<Map<String, Object>> ranking = new ArrayList<>();

        for (Prestador prestador : prestadoresAtivos) {
            long total = pedidosPorPrestador.getOrDefault(
                    prestador.getId(), 0L);

            if (total > 0) {
                Map<String, Object> linha = new LinkedHashMap<>();
                linha.put("idPrestador", prestador.getId());
                linha.put("nome", prestador.getNome());
                linha.put("total", total);
                ranking.add(linha);
            }
        }

        ranking.sort(
                Comparator.<Map<String, Object>, Long>comparing(
                        linha -> (Long) linha.get("total"))
                        .reversed());

        Map<String, Object> resultado = new LinkedHashMap<>();

        resultado.put("totalClientes", pessoasAtivas.size());
        resultado.put("totalPrestadores", prestadoresAtivos.size());
        resultado.putAll(montarResumoPedidos(pedidos));
        resultado.put("rankingPrestadores", ranking);

        return ResponseEntity.ok(resultado);
    }

    // GET http://127.0.0.1:8089/Dashboard/prestador/1
    @GetMapping("/prestador/{idPrestador}")
    public ResponseEntity<Map<String, Object>> dashboardPrestador(
            @PathVariable Integer idPrestador) {

        if (!prestadorRepository.existsById(idPrestador)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("erro", "Prestador não encontrado."));
        }

        List<Pedidos> todosPedidos = pedidosRepository.findAll();
        List<Pedidos> pedidosPrestador = new ArrayList<>();

        for (Pedidos pedido : todosPedidos) {
            if (pedido.getIdPrestador() != null
                    && pedido.getIdPrestador().equals(idPrestador)) {
                pedidosPrestador.add(pedido);
            }
        }

        Map<String, Object> resultado =
                montarResumoPedidos(pedidosPrestador);

        resultado.put("idPrestador", idPrestador);

        prestadorRepository.findById(idPrestador).ifPresent(
                prestador -> resultado.put("nomePrestador",
                        prestador.getNome()));

        return ResponseEntity.ok(resultado);
    }
}